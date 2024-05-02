#pragma once

#include <juce_gui_extra/juce_gui_extra.h>

struct Resource : juce::WebBrowserComponent::Resource
{
    Resource() = default;
    Resource(juce::String resourceName);

    auto getMimeType(juce::String filename,
                     juce::String defaultMimeType = "application/octet-stream") -> juce::String;
};
