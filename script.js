document.addEventListener('DOMContentLoaded', () => {
    const memoInput = document.getElementById('memo-input');
    const addBtn = document.getElementById('add-btn');
    const memoList = document.getElementById('memo-list');

    // Load memos from local storage
    let memos = JSON.parse(localStorage.getItem('memos')) || [];

    // Function to render all memos
    function renderMemos() {
        memoList.innerHTML = '';
        memos.forEach((memo, index) => {
            const memoCard = document.createElement('div');
            memoCard.className = 'memo-card';
            
            const content = document.createElement('div');
            content.className = 'memo-content';
            content.textContent = memo.text;

            const meta = document.createElement('div');
            meta.className = 'memo-meta';

            const dateSpan = document.createElement('span');
            dateSpan.className = 'memo-date';
            dateSpan.textContent = new Date(memo.date).toLocaleString([], { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            `;
            deleteBtn.title = 'Delete Memo';
            deleteBtn.onclick = () => deleteMemo(index);

            meta.appendChild(dateSpan);
            meta.appendChild(deleteBtn);

            memoCard.appendChild(content);
            memoCard.appendChild(meta);

            memoList.prepend(memoCard); // Add newest first
        });
    }

    // Function to add a new memo
    function addMemo() {
        const text = memoInput.value.trim();
        if (text) {
            const newMemo = {
                text: text,
                date: new Date().toISOString()
            };
            memos.push(newMemo);
            saveMemos();
            renderMemos();
            memoInput.value = '';
            memoInput.focus();
        }
    }

    // Function to delete a memo
    function deleteMemo(index) {
        // Find the card element to animate removal
        // Since we prepend items (reverse order), the index in DOM needs mapping
        // But simply recreating list is safer for now, let's just animate if possible or just remove
        // To keep it simple and bug-free, we'll just remove for now. 
        // If we want animation:
        memos.splice(index, 1);
        saveMemos();
        renderMemos();
    }

    // Save to local storage
    function saveMemos() {
        localStorage.setItem('memos', JSON.stringify(memos));
    }

    // Event listeners
    addBtn.addEventListener('click', addMemo);
    
    memoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addMemo();
        }
    });

    // Initial render
    renderMemos();
});
