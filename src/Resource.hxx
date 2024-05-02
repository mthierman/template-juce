#pragma once

#include <juce_gui_extra/juce_gui_extra.h>

struct Resource : juce::WebBrowserComponent::Resource
{
    Resource() = default;
    Resource(const juce::String& resourceName);

    auto
    getMimeType(const juce::String& filename,
                const juce::String& defaultMimeType = "application/octet-stream") -> juce::String;
};
