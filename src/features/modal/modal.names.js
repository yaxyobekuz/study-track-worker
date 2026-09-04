/**
 * Registry of every modal name in the worker panel.
 *
 * A `<ResponsiveModal name="...">` and every `openModal("...")` call must use a
 * name from this list. Adding a new modal? Register its name here first — in dev,
 * opening an unregistered name logs a warning so typos surface immediately.
 */
export const MODAL_NAMES = [
  "bugReport",
  "downloadApp",
  "excuseRequest",

  // Inventar (moddiy-texnik baza) — admin panel bilan bir xil nomlar
  "inventoryCategory",
  "inventoryItem",
  "inventoryLocation",
  "inventoryAddStock",
  "inventoryRepair",
  "inventoryWriteOff",
  "inventoryAdjust",
  "inventoryTransfer",
  "inventoryOpenCheck",
  "inventoryDamage",
  "inventoryCharge",
  "inventoryWaive",
  "inventoryCancelDamage",
  "inventoryCancelCharge",
  "inventoryDamagePayment",
  "inventoryVoidPayment",
];
