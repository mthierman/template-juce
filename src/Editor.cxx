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

    m_resources.emplace_back(Resource("index.html", "index_html"));
    m_resources.emplace_back(Resource("index.css", "index_css"));
    m_resources.emplace_back(Resource("index.js", "index_js"));
    m_resources.emplace_back(Resource("logo_dark.png", "logo_dark_png"));
    m_resources.emplace_back(Resource("logo_light.png", "logo_light_png"));
    m_resources.emplace_back(Resource("favicon.ico", "favicon_ico"));

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

auto Editor::getResource(const juce::String& url)
    -> std::optional<juce::WebBrowserComponent::Resource>
{
    const auto urlToRetrieve =
        url == "/" ? juce::String{"index.html"} : url.fromFirstOccurrenceOf("/", false, false);

    for (const auto& resource : m_resources)
    {
        if (urlToRetrieve == resource.m_route.c_str()) { return resource.m_resource; }
    }

    return std::nullopt;
}
