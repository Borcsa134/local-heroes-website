import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $wrapNodeInElement, mergeRegister } from '@lexical/utils';
import { PluginComponent } from '@payloadcms/richtext-lexical';
import { Drawer, TextInput, useField, useModal } from '@payloadcms/ui';
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  LexicalCommand,
} from 'lexical';
import { useEffect } from 'react';

import { $createImageNode, ImageNode, ImagePayload } from '../nodes/ImageNode';

export type InsertImagePayload = Readonly<ImagePayload>;

export const OPEN_IMAGE_MODAL_COMMAND: LexicalCommand<null> = createCommand('OPEN_IMAGE_MODAL_COMMAND');
export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> = createCommand('INSERT_IMAGE_COMMAND');

export const ImagesPlugin: PluginComponent = () => {
  const [editor] = useLexicalComposerContext();
  const { closeModal: closeBaseModal, toggleModal: toggleBaseModal } = useModal();
  const { value, setValue } = useField<string>({ path: 'image' });

  const onAdd = (payload: InsertImagePayload) => {
    closeBaseModal('image');
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
  };

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error('ImagesPlugin: ImageNode not registered on editor');
    }

    return mergeRegister(
      editor.registerCommand(
        OPEN_IMAGE_MODAL_COMMAND,
        () => {
          setValue('');
          toggleBaseModal('image');
          return true;
        },
        COMMAND_PRIORITY_EDITOR,
      ),
      editor.registerCommand<InsertImagePayload>(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          const imageNode = $createImageNode(payload);
          $insertNodes([imageNode]);
          if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
          }

          return true;
        },
        COMMAND_PRIORITY_EDITOR,
      ),
    );
  }, [editor, setValue, toggleBaseModal]);

  return (
    <Drawer slug="image" title="Image">
      <TextInput label="Image URL" path="image" placeholder="https://" value={value} onChange={setValue} />
      <button
        className="btn btn--style-primary btn--size-medium"
        onClick={() => {
          onAdd({
            src: value,
            altText: 'asd',
          });
        }}
      >
        Add Image
      </button>
    </Drawer>
  );
};
