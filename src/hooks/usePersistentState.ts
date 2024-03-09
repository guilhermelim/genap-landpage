import { useState, useEffect, Dispatch, SetStateAction } from "react";

const PREFIX = "usePersistentState_";

type PersistedStateTuple<S> = [S, Dispatch<SetStateAction<S>>];

/**
 * Interface que define o formato de um estado armazenado no localStorage.
 */
interface StoredState<S> {
  value: S;
  expiration?: number;
}

/**
 * Hook personalizado que mantém o estado em sincronia com o localStorage.
 * @param key Chave usada para identificar o estado no localStorage.
 * @param initialValue Valor inicial do estado.
 * @param expirationTime Tempo de vida do estado no localStorage (em milissegundos). Opcional.
 * @returns Uma tupla contendo o estado atual e uma função para atualizá-lo.
 */
function usePersistentState<S>(
  key: string,
  initialValue: S,
  expirationTime?: number
): PersistedStateTuple<S> {
  const prefixedKey = PREFIX + key;

  /**
   * Verifica se o código está sendo executado no navegador.
   * @returns `true` se o código está sendo executado no navegador, `false` caso contrário.
   */
  const isClient = (): boolean => typeof window !== "undefined";

  /**
   * Obtém o valor inicial do estado.
   * @returns O valor inicial do estado.
   */
  const getInitialValue = (): S => {
    if (isClient()) {
      const storedValue = localStorage.getItem(prefixedKey);
      if (storedValue) {
        const parsedValue: StoredState<S> = JSON.parse(storedValue);
        if (!hasExpired(parsedValue.expiration)) {
          return parsedValue.value;
        } else {
          removeState(prefixedKey);
        }
      }
      return initialValue;
    } else {
      return initialValue;
    }
  };

  const [state, setState] = useState<S>(getInitialValue);

  useEffect(() => {
    if (isClient()) {
      saveState(prefixedKey, state, expirationTime);
    }
  }, [prefixedKey, state, expirationTime]);

  return [state, setState];
}

/**
 * Verifica se um estado armazenado no localStorage expirou.
 * @param expiration Tempo de expiração do estado (em milissegundos).
 * @returns `true` se o estado expirou, `false` caso contrário.
 */
function hasExpired(expiration?: number): boolean {
  return expiration !== undefined && expiration < Date.now();
}

/**
 * Remove um estado do localStorage.
 * @param key Chave do estado a ser removido.
 */
function removeState(key: string): void {
  localStorage.removeItem(key);
}

/**
 * Salva um estado no localStorage.
 * @param key Chave do estado a ser salvo.
 * @param value Valor do estado.
 * @param expirationTime Tempo de vida do estado no localStorage (em milissegundos). Opcional.
 */
function saveState<S>(key: string, value: S, expirationTime?: number): void {
  const storedState: StoredState<S> = {
    value: value,
    expiration: expirationTime ? Date.now() + expirationTime : undefined,
  };
  localStorage.setItem(key, JSON.stringify(storedState));
}

export default usePersistentState;
