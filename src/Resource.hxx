#pragma once

#include <juce_gui_extra/juce_gui_extra.h>
#include <string>

struct Resource : juce::WebBrowserComponent::Resource
{
    Resource() = default;
    Resource(std::string route, std::string resourceName);

    auto getMimeType(std::string filename,
                  std::string defaultMimeType = "application/octet-stream") -> std::string;

    std::string m_route;
    // juce::WebBrowserComponent::Resource m_resource;
};
