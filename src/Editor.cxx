#include "Processor.hxx"
#include "Editor.hxx"

Editor::Editor(Processor& processor)
    : AudioProcessorEditor{&processor}, m_processor{processor},
      m_gainAttachment{
          *m_processor.m_parameters.getParameter(
              m_processor.m_parameterMap.at(Parameters::gain).first),
          m_gainRelay,
          m_processor.m_parameters.undoManager},
      m_phaseAttachment{
          *m_processor.m_parameters.getParameter(
              m_processor.m_parameterMap.at(Parameters::invertPhase).first),
          m_phaseRelay,
          m_processor.m_parameters.undoManager}
{
    juce::ignoreUnused(m_processor);

    addResource("/index.html", "index_html");
    addResource("/index.css", "index_css");
    addResource("/index.js", "index_js");
    addResource("/favicon.ico", "favicon_ico");
    addResource("/logo_dark.png", "logo_dark_png");
    addResource("/logo_light.png", "logo_light_png");

    addAndMakeVisible(m_browser);

#if defined(HOT_RELOAD)
    // m_browser.goToURL("http://localhost:5173/");
    m_browser.goToURL(juce::WebBrowserComponent::getResourceProviderRoot());
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

auto Editor::addResource(const juce::String& route, const juce::String& resourceName) -> void
{
    m_resources.try_emplace(route, Resource(resourceName));
}

auto Editor::getResource(const juce::String& url)
    -> std::optional<juce::WebBrowserComponent::Resource>
{
    const auto requestedUrl{url == "/" ? juce::String{"/index.html"} : url};

    for (const auto& [route, resource] : m_resources)
    {
        if (requestedUrl == route) { return resource; }
    }

    return std::nullopt;
}
