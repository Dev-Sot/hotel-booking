/**
 * Helper para manejar respuestas estándar
 */

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Crear respuesta exitosa
 */
export function createSuccessResponse<T>(
  data: T,
  message?: string
): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
  };
}

/**
 * Crear respuesta de error
 */
export function createErrorResponse<T = null>(
  error: string
): ApiResponse<T> {
  return {
    success: false,
    error,
  };
}

/**
 * Envolver función asíncrona para manejar errores automáticamente
 */
export async function asyncHandler<T>(
  fn: () => Promise<T>
): Promise<ApiResponse<T>> {
  try {
    const data = await fn();
    return createSuccessResponse(data);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return createErrorResponse(errorMessage);
  }
}
