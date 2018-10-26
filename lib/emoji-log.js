"use babel";

import EmojiLogView from "./emoji-log-view";
import { CompositeDisposable } from "atom";
import emojis from "./emojis.json";

export default {
  subscriptions: null,

  activate() {
    console.log("activating emoji log!");
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(
      atom.commands.add("atom-workspace", {
        "emoji-log:logSelected": () => this.logSelected()
      })
    );
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  logSelected() {
    const editor = atom.workspace.getActiveTextEditor();
    const selection = editor.getSelectedText();

    // generate emoji
    // there are 99 emojis in the list, so we can generate a number from 1-99 based on current time
    const emojiIndex = parseInt(Date.now().toString().slice(-2), 10) - 1;
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    editor.insertNewlineBelow();
    editor.insertText(`console.log("${emoji}", ${selection.trim()})`);
  }
};
