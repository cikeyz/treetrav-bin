class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTreeVisualizer {
    constructor() {
        this.canvas = document.getElementById('treeCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.scale = 1.0;
        this.currentTree = null;
        this.offsetX = 0;
        this.offsetY = 0;

        // Set up canvas
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Initialize UI elements
        this.levelsInput = document.getElementById('levels');
        this.generateBtn = document.getElementById('generateBtn');
        this.randomBtn = document.getElementById('randomBtn');

        // Bind event listeners
        this.generateBtn.addEventListener('click', () => this.generateTree());
        this.randomBtn.addEventListener('click', () => this.generateRandomTree());

        // Initialize canvas interactions
        this.setupCanvasInteractions();
    }

    resizeCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        if (this.currentTree) {
            this.drawTree();
        }
    }

    setupCanvasInteractions() {
        let isDragging = false;
        let lastX = 0;
        let lastY = 0;

        this.canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY;
            if (delta < 0) {
                this.scale = Math.min(2.0, this.scale * 1.1);
            } else {
                this.scale = Math.max(0.5, this.scale * 0.9);
            }
            this.drawTree();
        });

        this.canvas.addEventListener('mousedown', (e) => {
            isDragging = true;
            lastX = e.clientX;
            lastY = e.clientY;
        });

        this.canvas.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const dx = e.clientX - lastX;
                const dy = e.clientY - lastY;
                this.offsetX += dx;
                this.offsetY += dy;
                lastX = e.clientX;
                lastY = e.clientY;
                this.drawTree();
            }
        });

        this.canvas.addEventListener('mouseup', () => {
            isDragging = false;
        });

        this.canvas.addEventListener('mouseleave', () => {
            isDragging = false;
        });
    }

    buildTree(levels, values = null) {
        if (levels < 1 || levels > 5) return null;

        const totalNodes = Math.pow(2, levels) - 1;
        if (!values) {
            values = Array.from({length: totalNodes}, (_, i) => i + 1);
        }

        const root = new Node(values[0]);
        const queue = [root];
        let i = 1;

        while (i < totalNodes) {
            const current = queue.shift();
            if (i < values.length) {
                current.left = new Node(values[i++]);
                queue.push(current.left);
            }
            if (i < values.length) {
                current.right = new Node(values[i++]);
                queue.push(current.right);
            }
        }

        return root;
    }

    drawNode(x, y, value) {
        const nodeSize = 20 * this.scale;

        const isDarkTheme = document.body.getAttribute('data-theme') === 'dark';
        
        // Colors based on theme
        const colors = {
            shadow: isDarkTheme ? '#1E293B' : '#e5e7eb',
            shadowStroke: isDarkTheme ? '#334155' : '#d1d5db',
            main: isDarkTheme ? '#6366F1' : '#6C5CE7',
            mainStroke: isDarkTheme ? '#4F46E5' : '#5D4ED6',
            highlight: isDarkTheme ? '#818CF8' : '#8F85FF',
            text: '#FFFFFF'
        };

        // Draw shadow
        this.ctx.beginPath();
        this.ctx.arc(x + 2, y + 2, nodeSize, 0, Math.PI * 2);
        this.ctx.fillStyle = colors.shadow;
        this.ctx.strokeStyle = colors.shadowStroke;
        this.ctx.lineWidth = 2;
        this.ctx.fill();
        this.ctx.stroke();

        // Draw main circle
        this.ctx.beginPath();
        this.ctx.arc(x, y, nodeSize, 0, Math.PI * 2);
        this.ctx.fillStyle = colors.main;
        this.ctx.strokeStyle = colors.mainStroke;
        this.ctx.lineWidth = 2;
        this.ctx.fill();
        this.ctx.stroke();

        // Draw highlight
        this.ctx.beginPath();
        this.ctx.arc(x, y, nodeSize - 2, 0, Math.PI * 2);
        this.ctx.strokeStyle = colors.highlight;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();

        // Draw text
        this.ctx.fillStyle = colors.text;
        this.ctx.font = `${Math.max(12 * this.scale, 12)}px Segoe UI`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(value, x, y);
    }

    drawConnection(startX, startY, endX, endY) {
        const isDarkTheme = document.body.getAttribute('data-theme') === 'dark';
        
        const colors = {
            shadow: isDarkTheme ? '#1E293B' : '#e5e7eb',
            main: isDarkTheme ? '#6366F1' : '#6C5CE7'
        };

        // Draw shadow
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.strokeStyle = colors.shadow;
        this.ctx.lineWidth = 4;
        this.ctx.stroke();

        // Draw main line
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.strokeStyle = colors.main;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }

    drawTreeNode(node, x, y, level, maxLevel) {
        if (!node) return;

        const verticalSpacing = 80 * this.scale;
        const horizontalSpacing = (this.canvas.width / Math.pow(2, level)) * this.scale;

        this.drawNode(x, y, node.value);

        if (node.left) {
            const childX = x - horizontalSpacing / 2;
            const childY = y + verticalSpacing;
            this.drawConnection(x, y + 20 * this.scale, childX, childY - 20 * this.scale);
            this.drawTreeNode(node.left, childX, childY, level + 1, maxLevel);
        }

        if (node.right) {
            const childX = x + horizontalSpacing / 2;
            const childY = y + verticalSpacing;
            this.drawConnection(x, y + 20 * this.scale, childX, childY - 20 * this.scale);
            this.drawTreeNode(node.right, childX, childY, level + 1, maxLevel);
        }
    }

    drawTree() {
        // Save the current state
        this.ctx.save();
        
        // Clear the entire canvas by resetting transform
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Restore the saved state and apply current transformations
        this.ctx.restore();
        this.ctx.save();
        
        // Apply the current pan offset
        this.ctx.translate(this.offsetX, this.offsetY);
        
        if (this.currentTree) {
            const startX = this.canvas.width / 2;
            const startY = 40;
            this.drawTreeNode(this.currentTree, startX, startY, 1, parseInt(this.levelsInput.value));
        }
        
        this.ctx.restore();
    }

    preOrder(node) {
        if (!node) return [];
        return [node.value, ...this.preOrder(node.left), ...this.preOrder(node.right)];
    }

    inOrder(node) {
        if (!node) return [];
        return [...this.inOrder(node.left), node.value, ...this.inOrder(node.right)];
    }

    postOrder(node) {
        if (!node) return [];
        return [...this.postOrder(node.left), ...this.postOrder(node.right), node.value];
    }

    updateTraversalResults() {
        const preOrderResult = this.preOrder(this.currentTree);
        const inOrderResult = this.inOrder(this.currentTree);
        const postOrderResult = this.postOrder(this.currentTree);

        document.getElementById('preOrder').textContent = preOrderResult.join(' → ');
        document.getElementById('inOrder').textContent = inOrderResult.join(' → ');
        document.getElementById('postOrder').textContent = postOrderResult.join(' → ');
    }

    generateTree() {
        const levels = parseInt(this.levelsInput.value);
        if (levels >= 1 && levels <= 5) {
            this.currentTree = this.buildTree(levels);
            this.scale = 1.0;
            this.offsetX = 0;
            this.offsetY = 0;
            this.drawTree();
            this.updateTraversalResults();
        } else {
            alert('Please enter a number between 1 and 5.');
        }
    }

    generateRandomTree() {
        const levels = Math.floor(Math.random() * 5) + 1;
        this.levelsInput.value = levels;
        
        const totalNodes = Math.pow(2, levels) - 1;
        const values = Array.from({length: totalNodes}, () => Math.floor(Math.random() * 99) + 1);
        
        this.currentTree = this.buildTree(levels, values);
        this.scale = 1.0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.drawTree();
        this.updateTraversalResults();
    }
}

// Initialize the visualizer when the page loads
window.addEventListener('load', () => {
    const visualizer = new BinaryTreeVisualizer();
    
    // Redraw tree when theme changes
    document.getElementById('theme-toggle').addEventListener('click', () => {
        if (visualizer.currentTree) {
            visualizer.drawTree();
        }
    });
    
    // Watch for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addListener(() => {
        if (visualizer.currentTree) {
            visualizer.drawTree();
        }
    });
});
