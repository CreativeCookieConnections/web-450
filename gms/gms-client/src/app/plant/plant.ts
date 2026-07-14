export interface Plant {
    _id: string;
    gardenId: number;
    name: string;
    type: string;
    status: string;
    datePlanted?: string;
    dateHarvested?: string;
    dateCreated?: string;
    dateModified?: string;
}
