"use babel";

import EmojiLogView from "./emoji-log-view";
import { CompositeDisposable } from "atom";
import emojis from "./emojis.json";

export default {
  subscriptions: null,

  activate() {
    console.log("activating!");
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

    // generate random emoji
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    editor.insertNewlineBelow();
    editor.insertText(`console.log("${randomEmoji}", ${selection.trim()})`);
  }
};
