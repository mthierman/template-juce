#include "MainComponent.hxx"

MainComponent::MainComponent()
{
    addAndMakeVisible(m_browser);

#if defined(HOT_RELOAD)
    // Dev URL
    m_browser.goToURL("http://localhost:5173/");

    // Preview URL
    // m_browser.goToURL("http://localhost:4173/");

    // ResourceProvider
    // m_browser.goToURL(juce::WebBrowserComponent::getResourceProviderRoot());
#else
    m_browser.goToURL(juce::WebBrowserComponent::getResourceProviderRoot());
#endif

    setSize(600, 400);
}

auto MainComponent::paint(juce::Graphics& graphics) -> void
{
    graphics.fillAll(getLookAndFeel().findColour(juce::ResizableWindow::backgroundColourId));
}

auto MainComponent::resized() -> void { m_browser.setBounds(getLocalBounds()); }

auto MainComponent::getResource(const juce::String& url)
    -> std::optional<juce::WebBrowserComponent::Resource>
{
    // const auto requestedUrl{url == "/" ? juce::String{"/index.html"} : url};

    // for (const auto& [route, resource] : m_resources)
    // {
    //     if (requestedUrl == route)
    //     {
    //         return resource;
    //     }
    // }

    return std::nullopt;
}
