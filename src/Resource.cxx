#include "Resource.hxx"
#include "BinaryData.h"

#include <filesystem>
#include <unordered_map>

Resource::Resource(std::string route, std::string resourceName) : m_route{route}
{
    int dataSize{};
    auto namedResource{BinaryData::getNamedResource(resourceName.c_str(), dataSize)};

    std::vector<std::byte> binaryData(dataSize);
    std::memcpy(binaryData.data(), namedResource, dataSize);

    m_resource = juce::WebBrowserComponent::Resource{
        binaryData, mimeType(BinaryData::getNamedResourceOriginalFilename(resourceName.c_str()))};
}

auto Resource::mimeType(std::string filename, std::string defaultMimeType) -> std::string
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

    else { return defaultMimeType; }
}
