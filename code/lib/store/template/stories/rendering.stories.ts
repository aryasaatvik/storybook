import globalThis from 'global';
import { PlayFunctionContext } from '@storybook/csf';
import { within, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
  component: globalThis.Components.Button,
  args: {
    children: 'Click me',
  },
};

export const ForceReRender = {
  play: async ({ canvasElement }: PlayFunctionContext) => {
    const channel = globalThis.__STORYBOOK_ADDONS_CHANNEL__;
    const button = await within(canvasElement).findByRole('button');
    await button.focus();
    await expect(button).toHaveFocus();

    // By forcing the component to rerender, we reset the focus state
    await channel.emit('forceReRender');
    await waitFor(() => expect(button).not.toHaveFocus());
  },
};

export const ChangeArgs = {
  play: async ({ canvasElement, id }: PlayFunctionContext) => {
    // const channel = globalThis.__STORYBOOK_ADDONS_CHANNEL__;
    const button = await within(canvasElement).findByRole('button');
    await button.focus();
    await expect(button).toHaveFocus();

    // // When we change the args to the button, it should not rerender
    // await channel.emit('updateStoryArgs', { storyId: id, updatedArgs: { children: 'New Text' } });
    // await within(canvasElement).findByText(/New Text/);
    // await expect(button).toHaveFocus();

    // await channel.emit('resetStoryArgs', { storyId: id });
    // await within(canvasElement).findByText(/Click me/);
    // await expect(button).toHaveFocus();
  },
};
