cmake_minimum_required(VERSION 3.28)

project(JuceWebView)

option(
    RESTORE_NUGET
    "Restore Nuget packages"
    ON
)

include(cmake/Common.cmake)

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

    set(JUCE_WEBVIEW2_PACKAGE_LOCATION
        "${CMAKE_BINARY_DIR}/_deps/Nuget"
    )
endif()

add_subdirectory(projects)
