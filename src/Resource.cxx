#include "Resource.hxx"
#include "BinaryData.h"

#include <filesystem>
#include <unordered_map>

Resource::Resource(juce::String route, juce::String resourceName) : m_route{route}
{
    int dataSize{};
    auto namedResource{BinaryData::getNamedResource(resourceName.toUTF8(), dataSize)};

    std::vector<std::byte> binaryData(dataSize);
    std::memcpy(binaryData.data(), namedResource, dataSize);

    data = binaryData;
    mimeType = getMimeType(BinaryData::getNamedResourceOriginalFilename(resourceName.toUTF8()));
}

auto Resource::getMimeType(juce::String filename, juce::String defaultMimeType) -> juce::String
{
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types

    std::unordered_map<juce::String, juce::String> mimeTypes = {
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

    if (auto it = mimeTypes.find(
            std::filesystem::path(filename.toStdString()).extension().string().substr(1));
        it != mimeTypes.end())
    {
        return it->second;
    }

    else { return defaultMimeType; }
}
