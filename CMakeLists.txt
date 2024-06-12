cmake_minimum_required(VERSION 3.28)

project(JuceWebView)

include(cmake/Common.cmake)

include(FetchContent)

FetchContent_Declare(
    juce
    GIT_REPOSITORY "https://github.com/juce-framework/JUCE.git"
    GIT_TAG master
    GIT_SHALLOW ON
    )

FetchContent_MakeAvailable(juce)

find_program(
    NUGET_EXE
    nuget
    NO_CACHE
    )

if(NUGET_EXE)
    execute_process(
        COMMAND nuget install -ExcludeVersion -OutputDirectory "${CMAKE_BINARY_DIR}/_deps"
        WORKING_DIRECTORY "${PROJECT_SOURCE_DIR}"
        )

    set(JUCE_WEBVIEW2_PACKAGE_LOCATION "${CMAKE_BINARY_DIR}/_deps")
else()
    execute_process(COMMAND )
endif()

add_subdirectory(projects)
