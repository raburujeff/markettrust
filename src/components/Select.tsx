import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'

export type SelectOption<T extends string = string> = {
  value: T
  label: string
}

type SelectProps<T extends string> = {
  value: T
  options: SelectOption<T>[]
  onChange: (value: T) => void
  id?: string
  name?: string
  disabled?: boolean
  placeholder?: string
  'aria-label'?: string
}

export function Select<T extends string>({
  value,
  options,
  onChange,
  id,
  name,
  disabled = false,
  placeholder = 'Select…',
  'aria-label': ariaLabel,
}: SelectProps<T>) {
  const autoId = useId()
  const listboxId = `${autoId}-listbox`
  const triggerId = id ?? `${autoId}-trigger`
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(
      0,
      options.findIndex((o) => o.value === value),
    ),
  )

  const selected = options.find((o) => o.value === value)
  const label = selected?.label ?? placeholder

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  useEffect(() => {
    if (!open) return
    const idx = options.findIndex((o) => o.value === value)
    setActiveIndex(idx >= 0 ? idx : 0)
  }, [open, options, value])

  function selectAt(index: number) {
    const opt = options[index]
    if (!opt) return
    onChange(opt.value)
    setOpen(false)
  }

  function onTriggerKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (!open) {
        setOpen(true)
        return
      }
      if (e.key === 'Enter' || e.key === ' ') {
        selectAt(activeIndex)
        return
      }
      if (e.key === 'ArrowDown') {
        setActiveIndex((i) => Math.min(options.length - 1, i + 1))
      } else {
        setActiveIndex((i) => Math.max(0, i - 1))
      }
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
    }
    if (e.key === 'Home' && open) {
      e.preventDefault()
      setActiveIndex(0)
    }
    if (e.key === 'End' && open) {
      e.preventDefault()
      setActiveIndex(options.length - 1)
    }
  }

  return (
    <div
      className={`mt-select${open ? ' is-open' : ''}${disabled ? ' is-disabled' : ''}`}
      ref={rootRef}
    >
      {name ? <input type="hidden" name={name} value={value} /> : null}
      <button
        type="button"
        id={triggerId}
        className="mt-select-trigger"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label={ariaLabel}
        onClick={() => !disabled && setOpen((v) => !v)}
        onKeyDown={onTriggerKeyDown}
      >
        <span className="mt-select-value">{label}</span>
        <span className="mt-select-chevron" aria-hidden>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M3.5 5.25L7 8.75L10.5 5.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      {open ? (
        <ul
          id={listboxId}
          className="mt-select-list"
          role="listbox"
          aria-labelledby={triggerId}
          tabIndex={-1}
        >
          {options.map((opt, i) => {
            const isSelected = opt.value === value
            const isActive = i === activeIndex
            return (
              <li
                key={opt.value}
                id={`${autoId}-opt-${opt.value}`}
                role="option"
                aria-selected={isSelected}
                className={`mt-select-option${isSelected ? ' is-selected' : ''}${isActive ? ' is-active' : ''}`}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseDown={(e) => {
                  e.preventDefault()
                  selectAt(i)
                }}
              >
                {opt.label}
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
