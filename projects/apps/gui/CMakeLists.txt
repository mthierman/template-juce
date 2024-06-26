project(
    GuiApp
    VERSION 0.0.0
)

juce_add_gui_app(
    ${PROJECT_NAME}
    PRODUCT_NAME
    ${PROJECT_NAME}
    COMPANY_NAME
    ${PROJECT_NAME}
    ICON_BIG
    "data/icon.png"
    ICON_SMALL
    "data/icon.png"
    NEEDS_WEBVIEW2
    TRUE
)

target_sources(
    ${PROJECT_NAME}
    PRIVATE "src/App.cxx"
            "src/Browser.cxx"
            "src/MainComponent.cxx"
)

target_compile_definitions(
    ${PROJECT_NAME}
    PRIVATE JUCE_WEB_BROWSER=1
            JUCE_USE_WIN_WEBVIEW2_WITH_STATIC_LINKING=1
            JUCE_USE_CURL=0
            JUCE_APPLICATION_NAME_STRING="$<TARGET_PROPERTY:${PROJECT_NAME},JUCE_PRODUCT_NAME>"
            JUCE_APPLICATION_VERSION_STRING="$<TARGET_PROPERTY:${PROJECT_NAME},JUCE_VERSION>"
            $<$<CONFIG:Debug>:HOT_RELOAD=1>
)

target_link_libraries(
    ${PROJECT_NAME}
    PRIVATE juce::juce_gui_extra
    PUBLIC jwv::features
           jwv::definitions
           juce::juce_recommended_config_flags
           juce::juce_recommended_lto_flags
           juce::juce_recommended_warning_flags
)
