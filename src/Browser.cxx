#include "Browser.hxx"

auto Browser::pageAboutToLoad(const juce::String& newUrl) -> bool
{
    return newUrl == "http://localhost:5173/" ||
           newUrl == juce::WebBrowserComponent::getResourceProviderRoot();
}
