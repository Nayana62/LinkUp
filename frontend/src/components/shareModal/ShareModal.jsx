import { Modal, useMantineTheme } from "@mantine/core";
import PostShare from "../postShare/PostShare";

function ShareModal({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme();

  return (
    <>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        size="55%"
        // title="Authentication"
        overlayProps={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >
        {/* Modal content */}
        <PostShare/>
      </Modal>
    </>
  );
}

export default ShareModal;
