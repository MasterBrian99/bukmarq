import { expect, test } from 'vitest'
import welcome from "@/utils/welcome.tsx";



test('welcome log in console should show', () => {
    expect(welcome()).toBeUndefined();
})