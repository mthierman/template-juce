#pragma once

#include "Browser.hxx"
#include "Processor.hxx"
#include "Resource.hxx"

struct Editor final : public juce::AudioProcessorEditor
{
    explicit Editor(Processor&);
    ~Editor() override;

    auto paint(juce::Graphics&) -> void override;
    auto resized() -> void override;

    // auto addResource(const juce::String& route, const juce::String& resourceName) -> void;
    auto getResource(const juce::String& url) -> std::optional<juce::WebBrowserComponent::Resource>;

  private:
    Processor& m_processor;

    juce::WebSliderRelay m_gainRelay{m_browser, "gain"};
    juce::WebToggleButtonRelay m_phaseRelay{m_browser, "invertPhase"};

    std::unordered_map<juce::String, Resource> m_resources{
        {"/index.html", Resource("index_html")},
        {"/index.css", Resource("index_css")},
        {"/index.js", Resource("index_js")},
        {"/favicon.ico", Resource("favicon_ico")},
        {"/logo_dark.png", Resource("logo_dark_png")},
        {"/logo_light.png", Resource("logo_light_png")},
    };

    Browser m_browser{
        juce::WebBrowserComponent::Options{}
            .withBackend(juce::WebBrowserComponent::Options::Backend::webview2)
            .withWinWebView2Options(
                juce::WebBrowserComponent::Options::WinWebView2{}.withUserDataFolder(
                    juce::File::getSpecialLocation(juce::File::SpecialLocationType::tempDirectory)))
            .withNativeIntegrationEnabled()
            .withOptionsFrom(m_gainRelay)
            .withOptionsFrom(m_phaseRelay)
            .withResourceProvider([this](const auto& url) {
        return getResource(url);
    }, juce::URL{"http://localhost:5173/"}.getOrigin())};

    juce::WebSliderParameterAttachment m_gainAttachment;
    juce::WebToggleButtonParameterAttachment m_phaseAttachment;

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(Editor)
};
