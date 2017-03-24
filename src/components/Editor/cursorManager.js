const CursorManager = function(clients, session) {
    const self = this;
    this.clients = clients;
    this.session = session;
    this.update = function(html, markerLayer, session, config) {
        const start = config.firstRow;
        const end = config.lastRow;
        for (let client in self.clients) {
            if (!self.clients.hasOwnProperty(client)) {
                continue;
            }
            const pos = self.clients[client].cursor;
            if (pos.row < start) {
                continue;
            }
            else if (pos.row > end) {
                break;
            }
            const screenPos = session.documentToScreenPosition(pos);
            const username = client;
            const height = config.lineHeight;
            const width = config.characterWidth;
            const top = markerLayer.$getTop(screenPos.row, config);
            const left = markerLayer.$padding + screenPos.column * width;
            html.push(`
                      <div class="alternateCursor"
                           style="height: ${height}px; top: ${top}px; 
                                  left: ${left}px; width:${width}px;">
                      </div>
                      `);
        }
    }
    
    this.redraw = function() {
        this.session._signal("changeFrontMarker");
    }
    
    this.addCursor = function(username, cursor) {
        this.clients[username] = {
            cursor: cursor
        }
        this.redraw();
    }

    this.setCursor = function(username, cursor) {
        this.addCursor(username, cursor);
        this.redraw();
    }
    
    this.removeCursor = function(username) {
        delete this.clients[username];
        this.redraw();
    }

    this.setClients = function(clients) {
        this.clients = clients;
        this.redraw();
    }

}

module.exports = CursorManager;
