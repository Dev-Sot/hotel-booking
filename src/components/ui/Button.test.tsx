import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button", () => {
  it("renderiza su contenido", () => {
    render(<Button>Reservar</Button>);
    expect(screen.getByRole("button", { name: "Reservar" })).toBeInTheDocument();
  });

  it("dispara onClick al hacer click", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Reservar</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("no dispara onClick cuando está disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        Reservar
      </Button>
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });
});
