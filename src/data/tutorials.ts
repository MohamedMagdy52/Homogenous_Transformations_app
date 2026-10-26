export const tutorials=[
{n:1,title:'Fixed and moving axes',text:'Rotate φ about world X, then θ about current Z, then ψ about world Y.',answer:'Ry(ψ) · Rx(φ) · Rz(θ)',hint:'World operations enter on the left; current-frame operations enter on the right.'},
{n:2,title:'Mixed rotation sequence',text:'Rotate φ about world X, θ about world Z, then ψ about current X.',answer:'Rz(θ) · Rx(φ) · Rx(ψ)',hint:'Build outward from the current product.'},
{n:3,title:'Four rotations',text:'Rotate φ about world X, θ about world Z, ψ about current X, then α about world Z.',answer:'Rz(α) · Rz(θ) · Rx(φ) · Rx(ψ)',hint:'The last fixed rotation becomes the leftmost factor.'},
{n:4,title:'Composite rotation',text:'Rotate π/2 about X, followed by π/2 about the fixed Y-axis.',answer:'Ry(90°) · Rx(90°)',hint:'The fixed Y rotation premultiplies.'},
{n:5,title:'Relative orientation',text:'Find R³₂ from the two supplied orientations R²₁ and R³₁.',answer:'R³₂ = R³₁ (R²₁)ᵀ',hint:'The inverse of a rotation matrix is its transpose.'},
{n:6,title:'Robot, camera & object',text:'Find the target object frame {e} relative to the end-effector {c} using the measured camera transforms and known robot chain.',answer:'Tᶜₑ = (Tᵇ𝒸)⁻¹ (Tᵃᵦ)⁻¹ (Tᵈₐ)⁻¹ Tᵈₑ',hint:'Walk from c back through b, a, d, then forward to e.'},
{n:7,title:'Robot, table, cube & camera',text:'Relate the table, cube, and overhead camera frames to the robot base.',answer:'T³₂ = (T⁰₃)⁻¹ T⁰₂',hint:'The diagram fixes axis orientations; the extracted text alone does not preserve them.'}
];
