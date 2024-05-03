#include "Resource.hxx"
#include "BinaryData.h"

#include <filesystem>

Resource::Resource(const juce::String& resourceName)
{
    int dataSize{};
    auto namedResource{BinaryData::getNamedResource(resourceName.toUTF8(), dataSize)};

    data.resize(dataSize);
    std::memcpy(data.data(), namedResource, dataSize);

    mimeType = getMimeType(BinaryData::getNamedResourceOriginalFilename(resourceName.toUTF8()));
}

auto Resource::getMimeType(const juce::String& filename,
                           const juce::String& defaultMimeType) -> juce::String
{
    if (auto iterator{s_mimeTypes.find(
            std::filesystem::path(filename.toStdString()).extension().string().substr(1))};
        iterator != s_mimeTypes.end())
    {
        return iterator->second;
    }

    else
    {
        return defaultMimeType;
    }
}
