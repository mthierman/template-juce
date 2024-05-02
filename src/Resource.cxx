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
        {"aac", "audio/aac"},
        {"aif", "audio/aiff"},
        {"aiff", "audio/aiff"},
        {"avif", "image/avif"},
        {"bmp", "image/bmp"},
        {"css", "text/css"},
        {"csv", "text/csv"},
        {"flac", "audio/flac"},
        {"gif", "image/gif"},
        {"htm", "text/html"},
        {"html", "text/html"},
        {"ico", "image/vnd.microsoft.icon"},
        {"jpeg", "image/jpeg"},
        {"jpg", "image/jpeg"},
        {"js", "text/javascript"},
        {"json", "application/json"},
        {"md", "text/markdown"},
        {"mid", "audio/midi"},
        {"midi", "audio/midi"},
        {"mjs", "text/javascript"},
        {"mp3", "audio/mpeg"},
        {"mp4", "video/mp4"},
        {"mpeg", "video/mpeg"},
        {"ogg", "audio/ogg"},
        {"otf", "font/otf"},
        {"pdf", "application/pdf"},
        {"png", "image/png"},
        {"rtf", "application/rtf"},
        {"svg", "image/svg+xml"},
        {"svgz", "image/svg+xml"},
        {"tif", "image/tiff"},
        {"tiff", "image/tiff"},
        {"ttf", "font/ttf"},
        {"txt", "text/plain"},
        {"wasm", "application/wasm"},
        {"wav", "audio/wav"},
        {"weba", "audio/webm"},
        {"webm", "video/webm"},
        {"webp", "image/webp"},
        {"woff", "font/woff"},
        {"woff2", "font/woff2"},
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
