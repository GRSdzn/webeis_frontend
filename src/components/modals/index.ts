import ObjectGeneratorModal from "./ObjectGeneratorModal";
import { TestModal } from "./TestModal";

export const modalsList = {
    demonstration: TestModal,
    objectGenerator: ObjectGeneratorModal,
    /* ...other modals */
  };
  declare module '@mantine/modals' {
    export interface MantineModalsOverride {
      modals: typeof modalsList;
    }
  }