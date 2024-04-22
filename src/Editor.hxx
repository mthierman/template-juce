#pragma once

#include "Processor.hxx"

struct Editor final : public juce::AudioProcessorEditor
{
    explicit Editor(Processor&);
    ~Editor() override;

    auto paint(juce::Graphics&) -> void override;
    auto resized() -> void override;

  private:
    Processor& m_processor;

    juce::WebSliderRelay m_sliderRelay{m_browser, "gain"};

    juce::WebBrowserComponent m_browser{
        juce::WebBrowserComponent::Options{}
            .withBackend(juce::WebBrowserComponent::Options::Backend::webview2)
            .withWinWebView2Options(
                juce::WebBrowserComponent::Options::WinWebView2{}.withUserDataFolder(
                    juce::File::getSpecialLocation(juce::File::SpecialLocationType::tempDirectory)))
            .withNativeIntegrationEnabled()
            .withOptionsFrom(m_sliderRelay)};

    juce::WebSliderParameterAttachment m_sliderAttachment;

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(Editor)
};
