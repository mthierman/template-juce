#include "Resource.hxx"
#include "BinaryData.h"

#include <filesystem>
#include <unordered_map>

Resource::Resource(const juce::String& resourceName)
{
    int dataSize{};
    auto namedResource{BinaryData::getNamedResource(resourceName.toUTF8(), dataSize)};

    data.reserve(dataSize);
    std::memcpy(data.data(), namedResource, dataSize);

    mimeType = getMimeType(BinaryData::getNamedResourceOriginalFilename(resourceName.toUTF8()));
}

auto Resource::getMimeType(const juce::String& filename, const juce::String& defaultMimeType) -> juce::String
{
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types

    std::unordered_map<juce::String, juce::String> mimeTypes = {
        {"txt", "text/plain"},
        {"md", "text/markdown"},
        {"htm", "text/html"},
        {"html", "text/html"},
        {"css", "text/css"},
        {"js", "text/javascript"},
        {"mjs", "text/javascript"},
        {"csv", "text/csv"},
        {"json", "application/json"},
        {"otf", "font/otf"},
        {"ttf", "font/ttf"},
        {"woff", "font/woff"},
        {"woff2", "font/woff2"},
        {"avif", "image/avif"},
        {"ico", "image/vnd.microsoft.icon"},
        {"jpg", "image/jpeg"},
        {"jpeg", "image/jpeg"},
        {"gif", "image/gif"},
        {"png", "image/png"},
        {"webp", "image/webp"},
        {"tif", "image/tiff"},
        {"tiff", "image/tiff"},
        {"svg", "image/svg+xml"},
        {"svgz", "image/svg+xml"},
        {"bmp", "image/bmp"},
        {"mid", "audio/midi"},
        {"midi", "audio/midi"},
        {"aac", "audio/aac"},
        {"aif", "audio/aiff"},
        {"aiff", "audio/aiff"},
        {"wav", "audio/wav"},
        {"ogg", "audio/ogg"},
        {"flac", "audio/flac"},
        {"mp3", "audio/mpeg"},
        {"weba", "audio/webm"},
        {"webm", "video/webm"},
        {"mp4", "video/mp4"},
        {"mpeg", "video/mpeg"},
        {"wasm", "application/wasm"},
        {"pdf", "application/pdf"},
        {"rtf", "application/rtf"},
        {"xml", "application/xml"},
        {"zip", "application/zip"},
    };

    if (auto it = mimeTypes.find(std::filesystem::path(filename.toStdString()).extension().string().substr(1));
        it != mimeTypes.end())
    {
        return it->second;
    }

    else { return defaultMimeType; }
}
