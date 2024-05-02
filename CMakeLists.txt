cmake_minimum_required(VERSION 3.28)

project(
    JuceWebView
    VERSION 0.0.1
)

option(
    RESTORE_NUGET
    "Restore Nuget packages"
    ON
)

include(FetchContent)

FetchContent_Declare(
    juce
    GIT_REPOSITORY "https://github.com/juce-framework/JUCE.git"
    GIT_TAG juce8
    GIT_SHALLOW ON
)

FetchContent_MakeAvailable(juce)

if(RESTORE_NUGET)
    execute_process(
        COMMAND nuget restore -PackagesDirectory "${CMAKE_BINARY_DIR}/_deps/Nuget"
        WORKING_DIRECTORY "${PROJECT_SOURCE_DIR}"
    )

    cmake_path(
        SET
        JUCE_WEBVIEW2_PACKAGE_LOCATION
        "${CMAKE_BINARY_DIR}/_deps/Nuget"
    )
endif()

file(
    GLOB_RECURSE
    GUI_SOURCES
    "${PROJECT_SOURCE_DIR}/gui"
)

set(GUI_OUTPUT
    "${PROJECT_BINARY_DIR}/gui/index.html"
    "${PROJECT_BINARY_DIR}/gui/index.css"
    "${PROJECT_BINARY_DIR}/gui/index.js"
    "${PROJECT_BINARY_DIR}/gui/favicon.ico"
    "${PROJECT_BINARY_DIR}/gui/logo_dark.svg"
    "${PROJECT_BINARY_DIR}/gui/logo_light.svg"
    "${PROJECT_BINARY_DIR}/gui/phase.svg"
)

add_custom_command(
    OUTPUT ${GUI_OUTPUT}
    COMMAND pnpm run build
    DEPENDS ${GUI_SOURCES}
)

add_custom_target(
    Vite
    ALL
    DEPENDS ${GUI_OUTPUT}
)

juce_add_binary_data(
    BinaryData
    HEADER_NAME
    "BinaryData.h"
    NAMESPACE
    "BinaryData"
    SOURCES
    ${GUI_OUTPUT}
)

juce_add_plugin(
    ${PROJECT_NAME}
    ICON_BIG
    "${PROJECT_SOURCE_DIR}/gui/public/icon.png"
    ICON_SMALL
    "${PROJECT_SOURCE_DIR}/gui/public/icon.png"
    PRODUCT_NAME
    ${PROJECT_NAME}
    COMPANY_NAME
    ${PROJECT_NAME}
    PLUGIN_MANUFACTURER_CODE
    Wvap
    PLUGIN_CODE
    Wvap
    FORMATS
    AU
    VST3
    Standalone
    IS_SYNTH
    FALSE
    NEEDS_MIDI_INPUT
    FALSE
    NEEDS_MIDI_OUTPUT
    FALSE
    IS_MIDI_EFFECT
    FALSE
    EDITOR_WANTS_KEYBOARD_FOCUS
    TRUE
    COPY_PLUGIN_AFTER_BUILD
    FALSE
    NEEDS_WEBVIEW2
    TRUE
)

target_compile_features(
    ${PROJECT_NAME}
    PRIVATE cxx_std_23
)

target_sources(
    ${PROJECT_NAME}
    PRIVATE "${PROJECT_SOURCE_DIR}/src/Browser.cxx"
            "${PROJECT_SOURCE_DIR}/src/Editor.cxx"
            "${PROJECT_SOURCE_DIR}/src/Processor.cxx"
            "${PROJECT_SOURCE_DIR}/src/Resource.cxx"
    PRIVATE FILE_SET
            HEADERS
            BASE_DIRS
            "${PROJECT_SOURCE_DIR}/src"
            FILES
            "${PROJECT_SOURCE_DIR}/src/Browser.hxx"
            "${PROJECT_SOURCE_DIR}/src/Editor.hxx"
            "${PROJECT_SOURCE_DIR}/src/Global.hxx"
            "${PROJECT_SOURCE_DIR}/src/Processor.hxx"
            "${PROJECT_SOURCE_DIR}/src/Resource.hxx"
)

target_compile_definitions(
    ${PROJECT_NAME}
    PUBLIC JUCE_WEB_BROWSER=1
           JUCE_USE_WIN_WEBVIEW2_WITH_STATIC_LINKING=1
           JUCE_USE_CURL=0
           JUCE_VST3_CAN_REPLACE_VST2=0
           $<$<CONFIG:Debug>:HOT_RELOAD=1>
)

target_link_libraries(
    ${PROJECT_NAME}
    PRIVATE BinaryData
            juce::juce_audio_utils
            juce::juce_gui_extra
    PUBLIC juce::juce_recommended_config_flags
           juce::juce_recommended_lto_flags
           juce::juce_recommended_warning_flags
)

target_compile_definitions(
    ${PROJECT_NAME}
    PRIVATE _SILENCE_CXX23_ALIGNED_STORAGE_DEPRECATION_WARNING
)

add_dependencies(
    BinaryData
    Vite
)
