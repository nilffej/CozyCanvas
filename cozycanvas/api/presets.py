import cozycanvas

_presets = {
    "bathroom": [
        ["sink", "5", "10", "0", "10000", "https://www.ikea.com/us/en/images/products/kilsviken-sink-black-quartz-composite__0831716_pe777316_s5.jpg?f=xl", "https://www.ikea.com/us/en/p/kilsviken-sink-black-quartz-composite-s39337015/"]
    ],
    "bedroom": [
        ["bed", "10", "5", "0", "34900", "https://www.ikea.com/us/en/images/products/malm-bed-frame-high-black-brown-luroey__0638608_pe699032_s5.jpg?f=xl", "https://www.ikea.com/us/en/p/malm-bed-frame-high-black-brown-luroey-s69009475/"]
    ]
}

_presetKeys = ["name", "width", "length", "rotationDegree", "cost", "image", "link"]


@cozycanvas.app.route('/presets', methods=['GET'])
def presets():
    output = {}
    for category, presets in _presets.items():
        items = []
        for preset in presets:
            d = {}
            for key, value in zip(_presetKeys, preset):
                d[key] = value
            items.append(d)
        output[category] = items
    return output
