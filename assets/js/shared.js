/**
 * Idea Validation Lab — Shared JavaScript Utilities
 * تابع‌های کمکی مشترک برای مدیریت ذخیره‌سازی محلی، خروجی‌ها و پیام‌ها
 */

window.IdeaLabUtils = {
    /**
     * ذخیره‌سازی امن در localStorage با مدیریت خطا
     * @param {string} key 
     * @param {Object|string} data 
     */
    saveToStorage(key, data) {
        try {
            const serialized = typeof data === 'string' ? data : JSON.stringify(data);
            localStorage.setItem(key, serialized);
            return true;
        } catch (e) {
            console.error('IdeaLab Storage Error (Save):', e);
            return false;
        }
    },

    /**
     * بازیابی امن داده از localStorage
     * @param {string} key 
     * @returns {Object|string|null}
     */
    loadFromStorage(key) {
        try {
            const item = localStorage.getItem(key);
            if (!item) return null;
            try {
                return JSON.parse(item);
            } catch {
                return item; // اگر رشته ساده باشد
            }
        } catch (e) {
            console.error('IdeaLab Storage Error (Load):', e);
            return null;
        }
    },

    /**
     * پاک‌کردن کلید اختصاصی از ذخیره‌سازی محلی
     * @param {string} key 
     */
    removeFromStorage(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('IdeaLab Storage Error (Remove):', e);
            return false;
        }
    },

    /**
     * دانلود فایل متنی، JSON یا CSV
     * @param {string} content 
     * @param {string} filename 
     * @param {string} mimeType 
     */
    downloadFile(content, filename, mimeType = 'text/plain;charset=utf-8') {
        try {
            const blob = new Blob([content], { type: mimeType });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (e) {
            console.error('IdeaLab Export Error:', e);
            alert('خطا در ایجاد فایل خروجی.');
        }
    },

    /**
     * نمایش پیام وضعیت موقت (موفقیت یا خطا) درون المان مشخص
     * @param {string} elementId 
     * @param {string} message 
     * @param {boolean} isError 
     * @param {number} duration 
     */
    showStatusMessage(elementId, message, isError = false, duration = 4000) {
        const el = document.getElementById(elementId);
        if (!el) return;
        el.textContent = message;
        el.style.color = isError ? '#dc2626' : 'var(--color-secondary, #0d9488)';
        
        // پاک کردن پیام قبلی در صورت وجود تایمر فعال
        if (el._statusTimer) clearTimeout(el._statusTimer);
        
        el._statusTimer = setTimeout(() => {
            el.textContent = '';
        }, duration);
    }
};
