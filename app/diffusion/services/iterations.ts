import api from "@/app/api";
import json from './resp1.json'

export const getDiffusionIterations = (id: string) => json.graphs;
// api.post(`/diffusions/${id}/iterations`).then((res) => res.data);
