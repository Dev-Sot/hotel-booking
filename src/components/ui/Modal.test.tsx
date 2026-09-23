import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "./Modal";

describe("Modal", () => {
  it("no renderiza contenido cuando open es false", () => {
    render(
      <Modal open={false} onClose={() => {}} title="Título">
        <p>Contenido</p>
      </Modal>
    );
    expect(screen.queryByText("Contenido")).not.toBeInTheDocument();
  });

  it("renderiza título y children cuando open es true", () => {
    render(
      <Modal open onClose={() => {}} title="Iniciar sesión">
        <p>Contenido</p>
      </Modal>
    );
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
    expect(screen.getByText("Contenido")).toBeInTheDocument();
  });

  it("llama a onClose al hacer click en el botón de cerrar", async () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Título">
        <p>Contenido</p>
      </Modal>
    );
    await userEvent.click(screen.getByRole("button", { name: "Cerrar" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
