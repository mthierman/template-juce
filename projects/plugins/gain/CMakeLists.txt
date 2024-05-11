project(
    Gain
    VERSION 0.0.0
)

juce_add_plugin(
    ${PROJECT_NAME}
    PRODUCT_NAME
    ${PROJECT_NAME}
    COMPANY_NAME
    ${PROJECT_NAME}
    ICON_BIG
    "data/icon.png"
    ICON_SMALL
    "data/icon.png"
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

target_sources(
    ${PROJECT_NAME}
    PRIVATE "src/Browser.cxx"
            "src/Editor.cxx"
            "src/Processor.cxx"
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
    PRIVATE ${PROJECT_NAME}_BinaryData
            juce::juce_audio_utils
            juce::juce_gui_extra
    PUBLIC jwv::features
           jwv::definitions
           juce::juce_recommended_config_flags
           juce::juce_recommended_lto_flags
           juce::juce_recommended_warning_flags
)

set(VITE_OUTPUT
    "${CMAKE_BINARY_DIR}/plugins/gain/index.html"
    "${CMAKE_BINARY_DIR}/plugins/gain/index.css"
    "${CMAKE_BINARY_DIR}/plugins/gain/index.js"
    "${CMAKE_BINARY_DIR}/plugins/gain/favicon.ico"
)

juce_add_binary_data(
    ${PROJECT_NAME}_BinaryData
    HEADER_NAME
    "BinaryData.h"
    NAMESPACE
    "BinaryData"
    SOURCES
    ${VITE_OUTPUT}
)

add_custom_target(
    ${PROJECT_NAME}_Vite
    COMMAND pnpm run plugins.gain.build
    BYPRODUCTS ${VITE_OUTPUT}
)

add_dependencies(
    ${PROJECT_NAME}_BinaryData
    ${PROJECT_NAME}_Vite
)
