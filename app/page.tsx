'use client'

import { useEffect, useState } from 'react'

type Todo = {
  id: number
  text: string
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')
  const [editId, setEditId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')

  const fetchTodos = async () => {
    const res = await fetch('/api/todos')
    const data = await res.json()
    setTodos(data)
  }

  const handleAdd = async () => {
    if (!input.trim()) return
    await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input }),
    })
    setInput('')
    fetchTodos()
  }

  const handleDelete = async (id: number) => {
    await fetch('/api/todos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    fetchTodos()
  }

  const handleEdit = (todo: Todo) => {
    setEditId(todo.id)
    setEditText(todo.text)
  }

  const handleUpdate = async () => {
    if (editId === null || !editText.trim()) return
    await fetch('/api/todos', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editId, text: editText }),
    })
    setEditId(null)
    setEditText('')
    fetchTodos()
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-10 sm:px-6 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(129,140,248,0.35),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-cyan-500/15 blur-[90px]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
      />

      <div className="relative z-10 mx-auto w-full max-w-lg">
        <header className="mb-8 text-center sm:mb-10">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-indigo-300/90">
            Tasks
          </p>
          <h1 className="bg-gradient-to-br from-white via-slate-100 to-slate-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
            My Todo App
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            今日やることを整理しましょう
          </p>
        </header>

        <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-6 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAdd()
              }}
              className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none ring-indigo-400/0 transition focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-400/30"
              placeholder="新しいタスクを入力…"
              aria-label="新しいタスク"
            />
            <button
              type="button"
              onClick={handleAdd}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:from-indigo-400 hover:to-violet-400 hover:shadow-indigo-500/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300 active:scale-[0.98]"
            >
              <svg
                className="h-4 w-4 opacity-90"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden
              >
                <path strokeLinecap="round" d="M12 5v14M5 12h14" />
              </svg>
              追加
            </button>
          </div>

          <div className="mt-8">
            {todos.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/15 bg-slate-950/30 py-14 text-center">
                <p className="text-sm font-medium text-slate-300">
                  まだタスクがありません
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  フォームから追加してみてください
                </p>
              </div>
            ) : (
              <ul className="space-y-2">
                {todos.map((todo) => (
                  <li
                    key={todo.id}
                    className="group flex items-center gap-3 rounded-xl border border-white/5 bg-slate-950/35 px-3 py-3 transition hover:border-white/10 hover:bg-slate-950/50 sm:px-4"
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-200"
                      aria-hidden
                    >
                      <svg
                        className="h-4 w-4 opacity-90"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                        />
                      </svg>
                    </span>
                    <div className="min-w-0 flex-1">
                      {editId === todo.id ? (
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleUpdate()
                          }}
                          className="w-full rounded-lg border border-indigo-400/40 bg-slate-950/60 px-2 py-1.5 text-sm text-slate-100 outline-none ring-0 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/25"
                          aria-label="タスクを編集"
                          autoFocus
                        />
                      ) : (
                        <span className="block truncate text-sm text-slate-200">
                          {todo.text}
                        </span>
                      )}
                    </div>

                    <div className="flex shrink-0 items-center gap-1">
                      {editId === todo.id ? (
                        <button
                          type="button"
                          onClick={handleUpdate}
                          className="rounded-lg bg-emerald-500/15 px-3 py-1.5 text-xs font-medium text-emerald-300 transition hover:bg-emerald-500/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                        >
                          更新
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleEdit(todo)}
                          className="rounded-lg px-3 py-1.5 text-xs font-medium text-sky-300 transition hover:bg-sky-500/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                        >
                          編集
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDelete(todo.id)}
                        className="rounded-lg px-3 py-1.5 text-xs font-medium text-rose-300 transition hover:bg-rose-500/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
                      >
                        削除
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
