#pragma once

#include <juce_gui_extra/juce_gui_extra.h>
#include <string>

struct Resource
{
    Resource() = default;
    Resource(std::string path, std::string resourceName);

    auto mimeType(std::string filename,
                  std::string defaultMimeType = "application/octet-stream") -> std::string;

    std::string m_path;
    juce::WebBrowserComponent::Resource m_resource;
};
