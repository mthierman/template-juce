#pragma once

#include <juce_gui_extra/juce_gui_extra.h>

struct MainComponent final : public juce::Component
{
    MainComponent();

    auto paint(juce::Graphics&) -> void override;
    auto resized() -> void override;

  private:
    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(MainComponent)
};
