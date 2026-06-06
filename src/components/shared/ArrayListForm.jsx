import { Plus } from 'lucide-react'
import { useProgressiveReveal } from '../../hooks/useProgressiveReveal'
import ShowMoreButton from './ShowMoreButton'

/**
 * Renders a progressive-disclosure list of array form items.
 * Shows 2 items initially; "Show more" reveals 2 at a time.
 */
function ArrayListForm({ data, renderItem, onAdd, addLabel, revealLabel }) {
  const { visibleCount, showMore, hasMore, remaining } = useProgressiveReveal(data.length)

  return (
    <>
      {data.slice(0, visibleCount).map((item, index) => renderItem(item, index))}
      {hasMore && (
        <ShowMoreButton remaining={remaining} onClick={showMore} label={revealLabel} />
      )}
      <button type="button" className="add-btn" onClick={onAdd}>
        <Plus size={16} aria-hidden="true" /> {addLabel}
      </button>
    </>
  )
}

export default ArrayListForm
