#include "Processor.hxx"
#include "Editor.hxx"

Editor::Editor(Processor& processor)
    : AudioProcessorEditor{&processor}, m_processor{processor},
      m_sliderAttachment{*m_processor.m_parameters.getParameter("gain"), m_sliderRelay,
                         m_processor.m_parameters.undoManager}
{
    juce::ignoreUnused(m_processor);
    addAndMakeVisible(m_browser);
    m_browser.goToURL("http://localhost:5173/");
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
