#pragma once

#include "Browser.hxx"

#include <juce_gui_extra/juce_gui_extra.h>

struct MainComponent final : public juce::Component
{
    MainComponent();

    auto paint(juce::Graphics&) -> void override;
    auto resized() -> void override;

    auto getResource(const juce::String& url) -> std::optional<juce::WebBrowserComponent::Resource>;

  private:
    Browser m_browser{
        juce::WebBrowserComponent::Options{}
            .withBackend(juce::WebBrowserComponent::Options::Backend::webview2)
            .withWinWebView2Options(
                juce::WebBrowserComponent::Options::WinWebView2{}.withUserDataFolder(
                    juce::File::getSpecialLocation(juce::File::SpecialLocationType::tempDirectory)))
            .withNativeIntegrationEnabled()
            .withResourceProvider([this](const auto& url) { return getResource(url); },
                                  juce::URL{"http://localhost:5173/"}.getOrigin())};

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(MainComponent)
};
