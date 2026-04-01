import re

with open("src/App.tsx", "r") as f:
    text = f.read()

def extract(name):
    # Find the function definition
    match = re.search(f"const render{name} = \(\) => \((.*?)\n  \);", text, re.DOTALL)
    if not match:
        return ""
    return match.group(1)

pages = {
    "Home": {
        "imports": "import { Search, BarChart3, ArrowRight, LayoutDashboard, ShieldCheck, Users, ChevronRight, Star, Quote } from 'lucide-react';\nimport { View } from '../types';\nimport { KPIS, FEEDBACK_DATA } from '../constants';",
        "props": "setCurrentView: any, handleTrack: any, trackingId: any, setTrackingId: any",
        "body": extract("Home")
    },
    "About": {
        "imports": "import { Globe, Package } from 'lucide-react';",
        "props": "",
        "body": extract("About")
    },
    "Research": {
        "imports": "import { TrendingUp, Clock, DollarSign, Check } from 'lucide-react';\nimport { COMPETITORS_DATA } from '../constants';",
        "props": "",
        "body": extract("Research")
    },
    "Media": {
        "imports": "import { Image as ImageIcon, PlayCircle } from 'lucide-react';",
        "props": "",
        "body": extract("Media")
    },
    "Contact": {
        "imports": "import { Mail, Phone, MapPin, Check, Send } from 'lucide-react';",
        "props": "contactSuccess: boolean, setContactSuccess: any",
        "body": extract("Contact")
    },
    "Tracking": {
        "imports": "import { AlertCircle, Globe, Truck, Check, Copy, Download, MapPin, Package, Bot } from 'lucide-react';\nimport { STATUS_STEPS } from '../constants';\nimport { View } from '../types';",
        "props": "trackingId: string, setTrackingId: any, handleTrack: any, isLoading: boolean, error: string | null, shipment: any, isCopied: boolean, setIsCopied: any, setShowAI: any, setCurrentView: any, maskInfo: any",
        "body": extract("Tracking")
    }
}

for name, data in pages.items():
    if not data["body"]:
        print(f"Failed to extract {name}")
        continue
    
    props_decl = data['props']
    props_destr = ", ".join([p.split(":")[0].strip() for p in props_decl.split(",")]) if props_decl else ""
    
    content = f"""import React from 'react';
{data['imports']}

export const {name} = ({'{' + props_destr + '}' if props_destr else 'props'}: any) => {{
  return ({data['body']}
  );
}};
"""
    with open(f"src/pages/{name}.tsx", "w") as out:
        out.write(content)

print("Pages separated successfully.")
