#include "Processor.hxx"
#include "Editor.hxx"

Editor::Editor(Processor& processor)
    : AudioProcessorEditor{&processor}, m_processor{processor},
      m_gainAttachment{*m_processor.m_parameters.getParameter(
                           m_processor.m_parameterMap.at(Parameters::gain).first),
                       m_gainRelay, m_processor.m_parameters.undoManager},
      m_phaseAttachment{*m_processor.m_parameters.getParameter(
                            m_processor.m_parameterMap.at(Parameters::invertPhase).first),
                        m_phaseRelay, m_processor.m_parameters.undoManager}
{
    juce::ignoreUnused(m_processor);

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

    setResizable(true, true);
    setResizeLimits(400, 300, 800, 600);
    setSize(800, 600);
}

Editor::~Editor() {}

auto Editor::paint(juce::Graphics& graphics) -> void
{
    graphics.fillAll(getLookAndFeel().findColour(juce::ResizableWindow::backgroundColourId));
}

auto Editor::resized() -> void { m_browser.setBounds(getLocalBounds()); }

auto Editor::getResource(const juce::String& url)
    -> std::optional<juce::WebBrowserComponent::Resource>
{
    const auto requestedUrl{url == "/" ? juce::String{"/index.html"} : url};

    for (const auto& [route, resource] : m_resources)
    {
        if (requestedUrl == route)
        {
            return resource;
        }
    }

    return std::nullopt;
}
