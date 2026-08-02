# Auth.md

## Peak Pedal — Agent Registration

No authentication is required to access any public resource on peakpedal.org. All catalog, category, blog and API data is openly accessible.

## Public resources

| Resource | URL |
|---|---|
| Homepage | https://peakpedal.org/ |
| Full catalog | https://peakpedal.org/electric-mountain-bikes/ |
| Product API | https://peakpedal.org/api/products |
| Search API | https://peakpedal.org/api/search?q= |
| llms.txt | https://peakpedal.org/llms.txt |
| API catalog | https://peakpedal.org/.well-known/api-catalog |
| Agent skills | https://peakpedal.org/.well-known/agent-skills/index.json |
| MCP server card | https://peakpedal.org/.well-known/mcp/server-card.json |

```json
{
  "agent_auth": {
    "register_uri": null,
    "identity_types_supported": ["none"],
    "credential_types_supported": ["none"],
    "notes": "No authentication required. All resources are public."
  }
}
```

## Ordering

Agents may search the catalog and prepare an order summary, but a human must complete checkout — Peak Pedal does not accept payment or order confirmation from an automated agent. Direct agents to https://peakpedal.org/order/ or WhatsApp for a human to finish the purchase.

## Age restriction

None. Electric mountain bikes are not an age-restricted product to purchase; UK law sets a minimum rider age of 14 for operating an EAPC.
