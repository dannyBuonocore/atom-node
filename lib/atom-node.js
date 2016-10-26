'use babel';

import AtomNodeView from './atom-node-view';
import { CompositeDisposable } from 'atom';

export default {

  atomNodeView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomNodeView = new AtomNodeView(state.atomNodeViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomNodeView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-node:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomNodeView.destroy();
  },

  serialize() {
    return {
      atomNodeViewState: this.atomNodeView.serialize()
    };
  },

  toggle() {
    console.log('AtomNode was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
