#include "MainComponent.hxx"

MainComponent::MainComponent() { setSize(600, 400); }

auto MainComponent::paint(juce::Graphics& graphics) -> void
{
    graphics.fillAll(getLookAndFeel().findColour(juce::ResizableWindow::backgroundColourId));

    graphics.setFont(juce::FontOptions(16.0f));
    graphics.setColour(juce::Colours::white);
    graphics.drawText("Hello World!", getLocalBounds(), juce::Justification::centred, true);
}

auto MainComponent::resized() -> void {}
