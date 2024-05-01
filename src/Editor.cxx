#include "Processor.hxx"
#include "Editor.hxx"
#include "Resource.hxx"

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

    // #if defined(HOT_RELOAD)
    //     m_browser.goToURL("http://localhost:5173/");
    // #endif

    m_browser.goToURL(juce::WebBrowserComponent::getResourceProviderRoot());

    setResizable(true, true);
    setResizeLimits(400, 300, 800, 600);
    setSize(400, 300);
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
    DBG("TEST");

    const auto urlToRetrieve =
        url == "/" ? juce::String{"index.html"} : url.fromFirstOccurrenceOf("/", false, false);

    // std::vector<Resource> resources;

    // resources.emplace_back(Resource("/", "index_html"));
    // resources.emplace_back(Resource("/assets/index.css", "index_css"));
    // resources.emplace_back(Resource("/assets/index.js", "index_js"));
    // resources.emplace_back(Resource("/logo_dark.png", "logo_dark_png"));
    // resources.emplace_back(Resource("/logo_light.png", "logo_light_png"));
    // resources.emplace_back(Resource("/favicon.ico", "favicon_ico"));

    // for (const auto& res : resources)
    // {
    //     if (urlToRetrieve.compare(res.m_path))
    //     {
    //         DBG(res.m_path);
    //         return res.m_resource;
    //     }
    // }

    if (urlToRetrieve == "index.html")
    {
        DBG("index.html");
        return Resource("/", "index_html").m_resource;
    }

    return std::nullopt;
}
