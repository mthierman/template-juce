set(RESTORE_NUGET
    OFF
)

cmake_path(
    SET
    juce_SOURCE_DIR
    "$ENV{LIBRARIES}/JUCE"
)

cmake_path(
    SET
    JUCE_WEBVIEW2_PACKAGE_LOCATION
    "$ENV{NUGET}"
)
