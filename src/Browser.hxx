#pragma once

#include <juce_gui_extra/juce_gui_extra.h>

struct Browser : juce::WebBrowserComponent
{
    using juce::WebBrowserComponent::WebBrowserComponent;

    auto pageAboutToLoad(const juce::String& newUrl) -> bool override;
};
