#pragma once

#include "BinaryData.h"
#include <filesystem>

struct Resource
{
    Resource() = default;
    Resource(std::string path, std::string resourceName);

    auto mimeType(std::string filename) -> std::string;

    std::string m_path;
    juce::WebBrowserComponent::Resource m_resource;
};

Resource::Resource(std::string path, std::string resourceName) : m_path{path}
{
    int dataSize{};
    auto namedResource{BinaryData::getNamedResource(resourceName.c_str(), dataSize)};

    std::vector<std::byte> binaryData(dataSize);

    std::memcpy(binaryData.data(), namedResource, dataSize);

    m_resource = juce::WebBrowserComponent::Resource{binaryData, mimeType(resourceName)};
}

auto Resource::mimeType(std::string filename) -> std::string
{
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types

    std::unordered_map<std::string, std::string> mimeTypes = {
        {"txt", "text/plain"},
        {"html", "text/html"},
        {"css", "text/css"},
        {"js", "text/javascript"},
        {"json", "application/json"},
        {"woff2", "font/woff2"},
        {"ico", "image/vnd.microsoft.icon"},
        {"jpg", "image/jpeg"},
        {"jpeg", "image/jpeg"},
        {"png", "image/png"},
        {"svg", "image/svg+xml"},
    };

    if (auto it = mimeTypes.find(std::filesystem::path(filename).extension().string().substr(1));
        it != mimeTypes.end())
    {
        return it->second;
    }

    else { return "application/octect-stream"; }
}
